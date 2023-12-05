import React from 'react';
import { getCurrentPage } from '@/app/api';
import ContentRenderer from '@/components/ContentRenderer';
import AnswerChecker from '@/components/AnswerChecker';
import { BasicCard, QuestionCard } from '@/components/Cards';

export default async function Page({
  params
}: {
  params: { moduleName: string; position: string };
}) {
  const currentPage = await getCurrentPage(params.moduleName, params.position);
  if (!currentPage) {
    return <h1>404</h1>;
  }

  if (currentPage.error) {
    return <h1>Error: {currentPage.error}</h1>;
  }

  return (
    <div className='m-1'>
      {currentPage['lesson'] && (
        <BasicCard>
          <h3 className='text-xl'>{currentPage['lesson']['name']}</h3>
          <ContentRenderer content={currentPage['lesson']['content']} />
        </BasicCard>
      )}
      {currentPage['question'] && (
        <>
          <QuestionCard>
            <ContentRenderer content={currentPage['question']['content']} />
          </QuestionCard>
          <AnswerChecker
            questionId={currentPage['question']['id']}
            expectedOutput={currentPage['question']['expected_output']}
          />
        </>
      )}
    </div>
  );
}
