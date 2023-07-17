import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Sessions } from '@/pages/chat/SessionList';

import Sidebar from '../Sidebar';
import Header from './Header';
import SettingForm from './SettingForm';

const SettingLayout = memo(() => {
  const { t } = useTranslation('setting');
  const pageTitle = `${t('header')} - LobeChat`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Flexbox horizontal width={'100%'}>
        <Sidebar />
        <Sessions />
        <Flexbox flex={1}>
          <Header />
          <Flexbox align={'center'} padding={24}>
            <SettingForm />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </>
  );
});

export default SettingLayout;
