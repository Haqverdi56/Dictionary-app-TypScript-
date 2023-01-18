import React, { useEffect, useState, useRef, SyntheticEvent } from 'react'
import { IDictionary } from '../models/Dictionary'
import { DictionaryService } from '../service/DictionaryService';
import './dictionary.css'
import { FiVolume2 } from "react-icons/fi"


function Dictionary() {
  const [word, setWord] = useState<string>('');
  const [data, setData] = useState<IDictionary[]>([]);
  const soundRef = useRef<HTMLAudioElement>(null)
  const focusRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    focusRef.current?.focus()
  }, [word])

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    let dictionaryService = new DictionaryService();

    dictionaryService.getAll(word)
    .then(res=>setData(res))
    
  }
  
  return (
    <div className='dictionary-div'>
      <div>
        <div className='app'>
          <h1 className='h1'>English Dictionary</h1>
          <form onSubmit={onSubmit} className='form'>
            <input ref={focusRef} value={word} onChange={(e) => setWord(e.target.value)} className='input' type="text" placeholder='Search a word' />
            <p onClick={()=> {
              setWord('')
              setData([])
            }} className='cancel'>{word.length > 0 ? "x" : null}</p>
          </form>
        <div className='meaning'>
          {data && data.map((el,i) => (
            <div key={i}>
              <div className='sub-meanings'>
                <p>{el.word}<span className='def'>{el.phonetics[0]?.text}</span></p>
                <FiVolume2 onClick={() => soundRef.current?.play()}/>
                <audio ref={soundRef} src={el.phonetics[0]?.audio}></audio>
              </div>
              <div className='result'>
                <p>Definition <span className='def'>({el.meanings[0]?.partOfSpeech})</span></p>
                <p className='def'>{el.meanings[0]?.definitions[0].definition}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dictionary
