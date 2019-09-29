type state = {
  image: ref(option(Dom.element)),
  observer: ref(option(BsIntersectionObserver.Types.T.observer)),
  visible: bool,
};

type action =
  | Visible;

let setRef = (imageRef, {ReasonReact.state, send}) => {
  state.image := Js.Nullable.toOption(imageRef);
  state.observer :=
    Some(
      BsIntersectionObserver.Create.intersectionObserver(
        ~cb=
          (entries, _) => {
            Belt.Array.map(entries, entry =>
              if (entry.intersectionRatio > 0.) {
                send(Visible);
              }
            )
            ->ignore;
            ();
          },
        ~options=None,
      ),
    );
};

let component = ReasonReact.reducerComponent("Pixel");

let styles = Css.{"hide": [display(none)]};

let make = (~location, _) => {
  ...component,
  didMount: ({state}) =>
    switch (state.image^) {
    | Some(image) =>
      switch (state.observer^) {
      | Some(observer) => observer.observe(image)
      | None => ()
      }
    | None => ()
    },
  initialState: () => {
    image: ref(None),
    observer: ref(None),
    visible: false,
  },
  reducer: (action, state) =>
    switch (action) {
    | Visible => ReasonReact.Update({...state, visible: true})
    },
  render: self => {
    let src = {j|https://l6mmhh8ko9.execute-api.us-east-1.amazonaws.com/production/$location.png|j};

    <img
      ref={self.handle(setRef)}
      className=Css.(style(self.state.visible ? styles##hide : empty))
      src={self.state.visible ? src : ""}
    />;
  },
};
