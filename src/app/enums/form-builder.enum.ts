export type QUESTION_TYPE = 'CHECKBOX' | 'PARAGRAPH';

export const questionTypes: {
  label: string;
  value: QUESTION_TYPE;
}[] = [
  {
    label: 'Checkbox List',
    value: 'CHECKBOX'
  },
  {
    label: 'Paragraph',
    value: 'PARAGRAPH'
  },
];
