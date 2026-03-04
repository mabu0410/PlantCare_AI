// Theme Provider — Dark/Light mode context
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { MauSang, MauToi, BangMau } from './mau_sac';
import type { ChuDe } from '../types/kieu_du_lieu';

interface ChuDeContext {
    chu_de: ChuDe;
    mau: BangMau;
    laToi: boolean;
    chuyenChuDe: () => void;
    datChuDe: (cd: ChuDe) => void;
}

const ChuDeCtx = createContext<ChuDeContext>({
    chu_de: 'toi',
    mau: MauToi,
    laToi: true,
    chuyenChuDe: () => { },
    datChuDe: () => { },
});

export const useChuDe = () => useContext(ChuDeCtx);

interface Props {
    children: React.ReactNode;
}

export const ChuDeProvider: React.FC<Props> = ({ children }) => {
    const [chu_de, setChuDe] = useState<ChuDe>('toi');

    const chuyenChuDe = useCallback(() => {
        setChuDe(prev => (prev === 'toi' ? 'sang' : 'toi'));
    }, []);

    const datChuDe = useCallback((cd: ChuDe) => {
        setChuDe(cd);
    }, []);

    const value = useMemo(
        () => ({
            chu_de,
            mau: chu_de === 'toi' ? MauToi : MauSang,
            laToi: chu_de === 'toi',
            chuyenChuDe,
            datChuDe,
        }),
        [chu_de, chuyenChuDe, datChuDe]
    );

    return <ChuDeCtx.Provider value={ value }> { children } </ChuDeCtx.Provider>;
};
