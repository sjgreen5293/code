declare module "react-simple-code-editor" {
  import * as React from "react";

  export interface EditorProps {
    value: string;
    onValueChange: (code: string) => void;
    highlight: (code: string) => React.ReactNode;
    padding?: number;
    textareaId?: string;
    className?: string;
    style?: React.CSSProperties;
    preClassName?: string;
    tabSize?: number;
    insertSpaces?: boolean;
    ignoreTabKey?: boolean;
  }

  const Editor: React.FC<EditorProps>;

  export default Editor;
}
