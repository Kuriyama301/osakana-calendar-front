import React, { useState, useEffect, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { format, addDays, subDays, isValid, addYears, subYears, isAfter, isBefore } from 'date-fns';
import { ja } from 'date-fns/locale';

const InfiniteScrollCalendar = () => {
  const [dates, setDates] = useState([]);
  const [hasMore, setHasMore] = useState({ past: true, future: true });

  const today = useMemo(() => new Date(), []);
  const oneYearAgo = useMemo(() => subYears(today, 1), [today]);
  const oneYearFromNow = useMemo(() => addYears(today, 1), [today]);

  useEffect(() => {
    // 初期日付を設定（今日を中心に前後3日ずつ）
    const initialDates = [];
    for (let i = -3; i <= 3; i++) {
      initialDates.push(addDays(today, i));
    }
    setDates(initialDates);
  }, [today]);

  const loadMore = useCallback((direction) => {
    console.log(`loadMore called with direction: ${direction}`);
    setDates(prevDates => {
      const newDates = [...prevDates];
      const startDate = direction === 'past' ? newDates[0] : newDates[newDates.length - 1];
      
      if (!isValid(startDate)) {
        console.error('Invalid startDate:', startDate);
        return prevDates; // 変更を加えずに終了
      }

      const datesToAdd = [];
      for (let i = 1; i <= 7; i++) {
        const newDate = direction === 'past' ? subDays(startDate, i) : addDays(startDate, i);
        
        if (!isValid(newDate)) {
          console.error('Invalid newDate:', newDate);
          continue; // このイテレーションをスキップ
        }

        if (direction === 'past' && isBefore(newDate, oneYearAgo)) {
          setHasMore(prev => ({ ...prev, past: false }));
          break;
        } else if (direction === 'future' && isAfter(newDate, oneYearFromNow)) {
          setHasMore(prev => ({ ...prev, future: false }));
          break;
        }
        
        datesToAdd.push(newDate);
      }
      
      return direction === 'past' ? [...datesToAdd, ...newDates] : [...newDates, ...datesToAdd];
    });
  }, [oneYearAgo, oneYearFromNow]);

  const DateItem = useCallback(({ date }) => {
    if (!isValid(date)) {
      console.error('Invalid date in DateItem:', date);
      return null;
    }
    return (
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <div>{format(date, 'yyyy/MM/dd', { locale: ja })}</div>
        <div>{format(date, 'EEEE', { locale: ja })}</div>
      </div>
    );
  }, []);

  return (
    <div style={{ height: '300px', overflow: 'auto' }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => loadMore('past')}
        hasMore={hasMore.past}
        useWindow={false}
        isReverse={true}
        threshold={100}
        loader={<div key="past-loader">過去の日付を読み込み中...</div>}
      >
        {dates.map((date, index) => (
          <DateItem key={`date-${index}`} date={date} />
        ))}
      </InfiniteScroll>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => loadMore('future')}
        hasMore={hasMore.future}
        useWindow={false}
        threshold={100}
        loader={<div key="future-loader">未来の日付を読み込み中...</div>}
      >
        <div style={{ height: 1 }} />
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollCalendar;