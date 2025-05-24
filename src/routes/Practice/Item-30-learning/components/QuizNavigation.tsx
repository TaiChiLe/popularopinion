import { Button, Pagination } from 'antd';

type QuizNavigationProps = {
  total: number;
  current: number;
  onChange: (value: number) => void;
  onFinishButtonClick: () => void;
  showResults: boolean;
};

export function QuizNavigation(props: QuizNavigationProps) {
  return (
    <>
      {!props.showResults && (
        <>
          <Pagination
            align="center"
            defaultCurrent={props.current}
            total={props.total}
            defaultPageSize={1}
            onChange={props.onChange}
          />
          {props.current === props.total && (
            <Button onClick={props.onFinishButtonClick}>Finish</Button>
          )}
        </>
      )}
    </>
  );
}
