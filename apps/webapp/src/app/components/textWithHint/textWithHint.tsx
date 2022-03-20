import './textWithHint.scss';
import { IProps } from './props.interface';

export const TextWithHint = ({ text } : IProps) => {
  return (
    <div className={'text-with-hint'} title={text}>{ text }</div>
  );
}
