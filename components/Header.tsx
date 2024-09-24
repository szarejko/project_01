'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from 'lucide-react';

import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
// import { useMediaQuery} from '';

const clientId = process.env.WEB3AUTH_CLIENT_ID as string;

const chainConfig = {
  chainNameSpace: CHAIN_NAMESPACES.EIP155,
  chainId: '0xaa36a7',
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  displayName: 'Sepolia Testnet',
  blockExplorer: 'https://sepolia.etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum',
  logo: 'https://web3auth.io/images/ethereum.svg',
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  //@ts-ignore
  config: chainConfig,
});

const web3Auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
});

interface headerProps {
  onMenuClick: () => void;
  totalEarings: number;
}

export default function Header({ onMenuClick, totalEarings }: headerProps) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [balance, setBalance] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      try {
        await web3Auth.initModal();
        setProvider(web3Auth.provider);

        if (web3Auth.connected) {
          setLoggedIn(true);
          const user = await web3Auth.getUserInfo();
          setUserInfo(user);
          if (user.email) {
            localStorage.setItem('userEmail', user.email);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);
}
