export type QUESTION_TYPE = 'CHECK_BOX' | 'PARAGRAPH';

export const questionTypes: {
  label: string;
  value: QUESTION_TYPE;
}[] = [
  {
    label: 'Checkbox List',
    value: 'CHECK_BOX'
  },
  {
    label: 'Paragraph',
    value: 'PARAGRAPH'
  },
];
