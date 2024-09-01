'use client';

import { Button } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useCreateDatasetModal } from '../CreateEvaluation';

interface EmptyGuideProps {
  knowledgeBaseId: string;
}

const EmptyGuide = memo<EmptyGuideProps>(({ knowledgeBaseId }) => {
  const { t } = useTranslation('ragEval');
  const modal = useCreateDatasetModal();
  return (
    <Center gap={24} height={'100%'} width={'100%'}>
      <div>{t('evaluation.emptyGuide')}</div>
      <Flexbox gap={8} horizontal>
        <Button
          onClick={() => {
            modal.open({ knowledgeBaseId });
          }}
          type={'primary'}
        >
          {t('evaluation.addNewButton')}
        </Button>
      </Flexbox>
    </Center>
  );
});
export default EmptyGuide;
