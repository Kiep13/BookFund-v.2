import './text-with-hint.scss';

export function TextWithHint(props: any) {
  return (
    <div className={'text-with-hint'} title={props.text}>{ props.text }</div>
  );
}
