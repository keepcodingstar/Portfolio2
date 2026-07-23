'use client';

import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

export default function Clarity() {
  useEffect(() => {
    clarity.init('xqup96jm8b');
  }, []);

  return null;
}
