import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Chart from './Chart.js';
import { useAddNewScriptMutation } from '../features/scripts/scriptsApiSlice.js';
import useAuth from '../hooks/useAuth.js';
import {selectClientById, useUpdateClientNewTraderMutation, useUpdateClientActivateMutation, useDeleteClientMutation } from '../features/admins/clientsApiSlice';

const toDate = dstr => new Date(dstr).getTime();

const toDateTimeLocale = d => new Date(d - new Date(d).getTimezoneOffset() * 60000).toISOString().slice(0, -8);

function generate ({sum = 100, profit = 3, duration=3, step=1, start= Date.now()}) {
  const durMs = (duration*60*60*1000);
  const fsum = sum*(1+(profit/100));
  const startMs = start;

  const points = recurGener();
  points.unshift(0);
  points.push(1);

  return points.map((p, i) => [startMs + i * durMs/points.length , sum + (fsum-sum)*p]);
}

function recurGener(start = 0, end = 1, deep = 0, maxDeep = 6) {
  const deepRandCoef = 0.2;

  let middle = 2; 
  while(middle > 1) {
    middle = start + (end - start) / 2 + (1 - 2.4 * Math.random()) * deepRandCoef;
  }

  const res = [middle];

  if(deep < maxDeep) {
    res.unshift(...recurGener(start, middle, deep + 1));
    res.push(...recurGener(middle, end, deep + 1));
  }
  
  return res;
}

const ClientAccountScript = () => {
  const [sum, setSum] = useState(100);
  const [duration, setDuration] = useState(30);
  const [start, setStart] = useState(Date.now());
  const [isStartNow, setIsStartNow] = useState(true);
  const [step, setStep] = useState(2);
  const [profit, setProfit] = useState(3);
  const [generatedScript, setGeneratedScript] = useState(null);

  const { id } = useParams();
  const you = useAuth();
  const { email, trader } = useSelector(state => selectClientById(state, id)) || {};

  const [addNewScript, {
    isLoading, isError, isUninitialized, isSuccess
  }] = useAddNewScriptMutation();

  useEffect(() => {
    if(generatedScript) {
      handleGenerateScript();
    }
  }, [start, sum, duration, step, profit]);

  useEffect(() => {
    if(generatedScript) {
      //console.log((generatedScript.list[1][0] - generatedScript.list[0][0]) / (60*1000));
    }
  }, [generatedScript]);
  

  const handleCreateNewScript = e => {
    e.preventDefault();
    
    addNewScript(generatedScript);
    //console.log(generatedScript);
    resetGeneratedScript();
  }
  
  const handleGenerateScript = e => {
    if (e) e.preventDefault();
    const info = {start, profit, duration, sum, step, creator: you, trader, clientEmail: email};
    const list = generate(info)
    //console.table({start:  isStartNow ? Date.now() : start.getTime(), profit, duration: +duration, sum: +sum, step});
    setGeneratedScript({info, list});
  }

  const handleStartScript = e => {
    e.preventDefault();
  }

  const resetGeneratedScript = () => {
    setSum(100);
    setDuration(30);
    setStart(Date.now());
    setIsStartNow(true);
    setStep(2);
    setProfit(3);
    setGeneratedScript(null);
  }

  return (
  <>
    <form className="my-3" onSubmit={handleCreateNewScript }>
      <div className="row gy-2">
        <div className="col-lg-6">
          <div className="row">
            <div className="form-group col-lg-4">
              <div className="row p-0">
                <div className="col-lg-9 mx-0 pe-0">
                  <input 
                    id="sum"
                    type='number'
                    className="form-control text-end" 
                    onChange={e => setSum(+e.target.value)}
                    value={sum}
                    placeholder="100" />
                </div>
                <label htmlFor="sum" className="col-lg-3 col-form-label">$</label>
              </div>
            </div>
            <div className="form-group col-lg-4 ">
              <div className="row p-0">
                <div className="col-lg-8 pe-0">
                  <input 
                    id="duration"
                    type='number'
                    className="form-control text-end" 
                    onChange={e => setDuration(+e.target.value)}
                    value={duration}
                    placeholder="10" />
                </div>
                <label htmlFor="duration" className="col-lg-4 col-form-label">ч</label>
              </div>
            </div>
            <div className="form-group col-lg-4">
              <div className="row p-0">
                <div className="col-lg-8 pe-0">
                  <input 
                    id="profit"
                    type='number'
                    className="form-control text-end" 
                    onChange={e => setProfit(+e.target.value)}
                    value={profit}
                    placeholder="3" />
                </div>
                <label htmlFor="profit" className="col-lg-4 col-form-label">%</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-8">
              <h6>Дата и время старта</h6>
            </div>
            <div className="col-lg-4">
              <input className="checkbox me-1" id="startNow" type="checkbox" checked={isStartNow} onChange={() => setIsStartNow(prev => {setStart(Date.now()); return !prev;}) } />
              <label htmlFor="startNow" style={{userSelect: 'none'}}className="label-checkbox">сейчас</label>
            </div>
            <div className="form-group col-lg-12 ">
              <input 
                type='datetime-local'
                style={{display: isStartNow ? 'none' : 'block'}}
                className="form-control" 
                disabled={isStartNow}
                onChange={e => {
                  if(!e.target.value.length) return;
                  setStart(toDate(e.target.value))
                }}
                value={toDateTimeLocale(start)}
                placeholder="" />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <button 
            onClick={() => {
              resetGeneratedScript();
            }}

            className="btn btn-danger float-end"
            disabled={generatedScript === null}
            type="submit">
             отменить
          </button>
          <button 
            className="btn btn-dark text-bg-dark float-end me-2"
            onClick={handleGenerateScript}
            type="button">
            Генерация
          </button>
          <button 
            className="btn btn-dark text-bg-dark float-end me-2"
            disabled={generatedScript === null}
            type="submit">
            Запустить скрипт
          </button>
        </div>
        <div className="col-lg-12">
        </div>
      </div>
    </form>
    {
      generatedScript && <Chart name="Сумма" data={generatedScript?.list} />
    }
  </>
  );
}

export default ClientAccountScript;
