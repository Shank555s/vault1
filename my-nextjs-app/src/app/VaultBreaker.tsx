"use client";

import { useState, useEffect } from 'react';
import styles from './VaultBreaker.module.css';

const sentences = [
  {
    encrypted: [
      { encrypted: 'Unwfyjx', answer: 'Pirates' },
      { encrypted: 'wfniji', answer: 'raided' },
      { encrypted: 'xmnux', answer: 'ships' },
      { encrypted: 'sjfw', answer: 'near' },
      { encrypted: 'Hzgf', answer: 'Cuba' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Xrzllqjwx', answer: 'Smugglers' },
      { encrypted: 'hwtxxji', answer: 'crossed' },
      { encrypted: 'gtwijwx', answer: 'borders' },
      { encrypted: 'bnym', answer: 'with' },
      { encrypted: 'ltqi', answer: 'gold' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Ymnjajx', answer: 'Thieves' },
      { encrypted: 'jxhfuji', answer: 'escaped' },
      { encrypted: 'ymwtzlm', answer: 'through' },
      { encrypted: 'xjhwjy', answer: 'secret' },
      { encrypted: 'yzssjq', answer: 'tunnel' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Ijyjhynajx', answer: 'Detectives' },
      { encrypted: 'zshtajwji', answer: 'uncovered' },
      { encrypted: 'xytqjs', answer: 'stolen' },
      { encrypted: 'fwy', answer: 'art' },
      { encrypted: 'unjhjx', answer: 'pieces' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Mjnxy', answer: 'Heist' },
      { encrypted: 'thhzwji', answer: 'occurred' },
      { encrypted: 'izwnsl', answer: 'during' },
      { encrypted: 'wtdfq', answer: 'royal' },
      { encrypted: 'gfsvzjy', answer: 'banquet' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Uwnxtsjw', answer: 'Prisoner' },
      { encrypted: 'jxhfuji', answer: 'escaped' },
      { encrypted: 'zxnsl', answer: 'using' },
      { encrypted: 'mniijs', answer: 'hidden' },
      { encrypted: 'pjd', answer: 'key' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'afzqy', answer: 'Vault' },
      { encrypted: 'gwjfhmji', answer: 'breached' },
      { encrypted: 'zsijw', answer: 'under' },
      { encrypted: 'mjfad', answer: 'heavy' },
      { encrypted: 'xytwr', answer: 'storm' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Hzwxji', answer: 'Cursed' },
      { encrypted: 'htns', answer: 'coin' },
      { encrypted: 'ywnlljwji', answer: 'triggered' },
      { encrypted: 'ijfiqd', answer: 'deadly' },
      { encrypted: 'hzwxj', answer: 'curse' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Tzyqfbx', answer: 'Outlaws' },
      { encrypted: 'mfi', answer: 'had' },
      { encrypted: 'lfymjwji', answer: 'gathered' },
      { encrypted: 'fy', answer: 'at' },
      { encrypted: 'rnisnlmy', answer: 'midnight' },
    ]
  },
  {
    encrypted: [
      { encrypted: 'Xud', answer: 'Spy' },
      { encrypted: 'ijhtiji', answer: 'decoded' },
      { encrypted: 'rjxxflj', answer: 'message' },
      { encrypted: 'kwtr', answer: 'from' },
      { encrypted: 'jsjrd', answer: 'enemy' },
    ]
  },
];

const atbashMapping: Record<string, string> = {
  kozgrmfn: 'Platinum',
  tlow: 'Gold',
  wrznlmw: 'Diamond',
  yilmav: 'Bronze',
  hroevi: 'Silver',
};

const stage2CorrectOrder = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const assignRandomNumbers = <T,>(words: T[]): (T & { number: number })[] => {
  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffledNumbers = shuffleArray(availableNumbers);

  return words.map((word, index) => ({
    ...word,
    number: shuffledNumbers[index],
  }));
};

const VaultBreaker: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [shuffledSentence, setShuffledSentence] = useState<any[]>([]);
  const [decryptedWords, setDecryptedWords] = useState<Record<number, string>>({});
  const [originalSentence, setOriginalSentence] = useState<any[]>([]);
  const [stage2Items, setStage2Items] = useState<any[]>([]);
  const [stage2Decrypted, setStage2Decrypted] = useState<Record<number, string>>({});
  const [isVaultOpened, setIsVaultOpened] = useState(false);

  useEffect(() => {
    if (level === 1) {
      const selectedSentence = sentences[Math.floor(Math.random() * sentences.length)].encrypted;
      const assignedNumbers = assignRandomNumbers(selectedSentence);
      setOriginalSentence(assignedNumbers);
      const shuffled = shuffleArray(assignedNumbers);
      setShuffledSentence(shuffled);
      setDecryptedWords(
        shuffled.reduce((acc, item) => ({ ...acc, [item.number]: '' }), {})
      );
      setInputCode('');
    }

    if (level === 2) {
      const stage2Keys = Object.keys(atbashMapping).map((key) => ({
        encrypted: key,
        answer: atbashMapping[key],
      }));
      const shuffledStage2 = assignRandomNumbers(stage2Keys);
      setStage2Items(shuffledStage2);
      setStage2Decrypted(
        shuffledStage2.reduce((acc, item) => ({ ...acc, [item.number]: '' }), {})
      );
      setInputCode('');
    }
  }, [level]);

  const handleSubmitStage1 = () => {
    const correctDecryption = originalSentence.every(
      (item) => decryptedWords[item.number]?.trim().toLowerCase() === item.answer.toLowerCase()
    );

    if (!correctDecryption) {
      setMessage('One or more decrypted words are incorrect.');
      return;
    }

    const correctCode = originalSentence.map((item) => item.number).join('');
    const userCode = inputCode.trim();

    if (userCode === correctCode) {
      setMessage('Correct! Proceeding to Stage 2.');
      setLevel(2);
    } else {
      setMessage('Incorrect order. Try again.');
    }
  };

  const handleSubmitStage2 = () => {
    const correctDecryption = stage2Items.every(
      (item) => stage2Decrypted[item.number]?.trim().toLowerCase() === item.answer.toLowerCase()
    );

    if (!correctDecryption) {
      setMessage('One or more decrypted words are incorrect.');
      return;
    }

    const correctCode = stage2Items
      .sort((a, b) => stage2CorrectOrder.indexOf(a.answer) - stage2CorrectOrder.indexOf(b.answer))
      .map((item) => item.number)
      .join('');

    const userCode = inputCode.trim();

    if (userCode === correctCode) {
      setMessage('Vault Opened! Congratulations!');
      setIsVaultOpened(true);
    } else {
      setMessage('Incorrect order. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vault Breaker</h1>
      {level === 1 && (
        <div className={styles.card}>
          <p className={styles.levelText}>Level 1: The vault hums: Step back 5 times to unlock the door</p>
          {shuffledSentence.map((q, i) => (
            <div key={i} className={styles.inputContainer}>
              <strong>{q.encrypted}</strong> (#{q.number})
              <input
                type="text"
                value={decryptedWords[q.number] || ''}
                onChange={(e) =>
                  setDecryptedWords((prev) => ({ ...prev, [q.number]: e.target.value }))}
                className={styles.inputField}
              />
            </div>
          ))}
          <div className={styles.submitRow}>
  <input
    value={inputCode}
    onChange={(e) => setInputCode(e.target.value)}
    placeholder="Enter correct number order (e.g., 51342)"
    className={styles.inputField1}
  />
  <button onClick={handleSubmitStage1} className={styles.inputField1}>Submit</button>
</div>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      )}
      {level === 2 && (
  <div className={styles.card}>
    <p className={styles.levelText}>Stage 2: Decode the elements...</p>
    {stage2Items.map((item, i) => (
      <div key={i} className={styles.inputContainer}>
        <strong>{item.encrypted}</strong> (#{item.number})
        <input
          type="text"
          value={stage2Decrypted[item.number] || ''}
          onChange={(e) =>
            setStage2Decrypted((prev) => ({
              ...prev,
              [item.number]: e.target.value,
            }))
          }
          className={styles.inputField}
        />
      </div>
    ))}

    <input
      value={inputCode}
      onChange={(e) => setInputCode(e.target.value)}
      placeholder="Enter correct number order (e.g., 41325)"
      className={styles.inputField1}
    />

    <button onClick={handleSubmitStage2} className={styles.inputField1}>
      Submit
    </button>

    {message && <p className={styles.message}>{message}</p>}
  </div>
)}

    </div>
  );
};

export default VaultBreaker;