// Practice generators lessons can use by name (gen: linear, stem.ohm, csa.u4a, bank.BIO.cells).
import { G, type Gen } from '../generated';
import { STEM } from './gens';
import { CSA_GENS } from './csa';
import { ALG } from './gens2';
import { BIO, CHEM, PHYS, EARTH, CS, ENG, HIST, LANG, ARTS, conj } from './banks';

const banks = { BIO, CHEM, PHYS, EARTH, CS, ENG, HIST, LANG, ARTS } as Record<string, Record<string, Gen>>;
export const GENS: Record<string, Gen> = {
  ...G,
  ...Object.fromEntries(Object.entries(STEM).map(([k, g]) => [`stem.${k}`, g])),
  ...Object.fromEntries(Object.entries(ALG).map(([k, g]) => [`alg.${k}`, g])),
  ...Object.fromEntries(Object.entries(CSA_GENS).map(([k, g]) => [`csa.${k}`, g])),
  ...Object.fromEntries(Object.entries(banks).flatMap(([b, gs]) => Object.entries(gs).map(([k, g]) => [`bank.${b}.${k}`, g]))),
  'conj.spanish': conj('Spanish'), 'conj.french': conj('French'),
};
