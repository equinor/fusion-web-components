import extractProps from './extract-props';
import { FormfieldElement, FormfieldElementProps } from '@equinor/fusion-wc-formfield';
import { PropsWithChildren } from 'react';
FormfieldElement;

export const FormField = ({ children, ...props }: PropsWithChildren<FormfieldElementProps>): JSX.Element => (
  <fwc-formfield {...extractProps<FormfieldElementProps>(props)}>{children}</fwc-formfield>
);

// export const Container = ({flow, children} : PropsWithChildren<{flow: 'column'|'row'}>) => (
//   <div style={{display: 'flex', flexFlow: 'column', gap: '10px'}}>
//     {children}
//   </div>
// );

// export const TemplateCheckbox = (props: FormfieldElementProps) => {
//   return (
//     <Container flow={props.spaceBetween ? 'column': 'row'}>
//       <fwc-formfield label="${props.label}" ?alignEnd=${props.alignEnd} ?spaceBetween=${props.spaceBetween} ?nowrap=${props.nowrap} >
//           <fwc-checkbox />
//         </fwc-formfield>
//         <fwc-formfield label="${props.label}" ?alignEnd=${props.alignEnd} ?spaceBetween=${props.spaceBetween} ?nowrap=${props.nowrap}>
//           <fwc-switch />
//         </fwc-formfield>
//         <fwc-formfield label="${props.label}" ?alignEnd=${props.alignEnd} ?spaceBetween=${props.spaceBetween} ?nowrap=${props.nowrap}>
//           <fwc-radio />
//         </fwc-formfield>
//         <fwc-formfield label="${props.label}" ?alignEnd=${props.alignEnd} ?spaceBetween=${props.spaceBetween} ?nowrap=${props.nowrap}>
//           <fwc-textinput />
//         </fwc-formfield>
//     </Container>
//   );
// };

export default FormField;
