'use client';

import React from 'react';
import { Tavsiye } from '@/lib/types';
import EntryTable from './EntryTable';

interface Props {
  entries: Tavsiye[];
  onVote: (id: string, type: 'like' | 'dislike') => void;
}

const EntryList: React.FC<Props> = ({ entries, onVote }) => {
  return (
    <div className="space-y-2">
      <EntryTable entries={entries} onVote={onVote} />
    </div>
  );
};

export default EntryList;
