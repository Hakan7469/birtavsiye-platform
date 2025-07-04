import React from 'react';
import EntryTable from './EntryTable';
import { Tavsiye } from '@/lib/types';

type EntryListProps = {
  entries: Tavsiye[];
  onVote: (entryId: string, type: 'like' | 'dislike') => void;
};

const EntryList: React.FC<EntryListProps> = ({ entries, onVote }) => {
  return (
    <div className="space-y-2">
      <EntryTable entries={entries} onVote={onVote} />
    </div>
  );
};

export default EntryList;
