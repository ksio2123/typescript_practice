/**
 * 1. Currently, ModalProps lets you pass in various impossible combinations of props.
 *
 * For instance, you can pass in a `variant` of "title" without passing in a title,
 * or you can pass in a `variant` of "no-title" WITH a title.
 *
 * Try to find a way to express ModalProps so that it's impossible to pass in
 * impossible combinations of props.
 */

// type ModalProps = {
//   variant: "no-title" | "title";
//   title?: string;
// };
type ModalNoTitleProp = {
  variant: 'no-title'
}

type ModalTitleProp = {
  title: string,
  variant: 'title'
}

export const Modal = (props: ModalNoTitleProp | ModalTitleProp) => {
  if (props.variant === "no-title") {
    return <div>No title</div>;
  } else {
    return <div>Title: {props.title}</div>;
  }
};

export const Test = () => {
  return (
    <div>
      <Modal variant="title" title="Hello" />
      <Modal variant="no-title" />

      {/* @ts-expect-error */}
      <Modal />
      <Modal
        variant="no-title"
        // @ts-expect-error
        title="Oh dear"
      />
    </div>
  );
};
