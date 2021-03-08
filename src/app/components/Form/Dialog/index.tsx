import React from 'react';
import { Overlay } from '@blueprintjs/core/lib/esm/components/overlay/overlay';
import { Classes } from '@blueprintjs/core';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpening?: () => void;
  onClosing?: () => void;
  children: React.ReactNode;
}

export function Dialog(props: Props) {
  return (
    <Overlay
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOpening={props.onOpening}
      onClosing={props.onClosing}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      hasBackdrop
      canOutsideClickClose={false}
      canEscapeKeyClose={false}
    >
      <div className="dialog">
        <div className="dialog-wrapper">
          <div className="dialog-container">
            <button className="dialog-close" onClick={props.onClose}>
              <span className="sr-only">Close</span>
            </button>
            {props.children}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
