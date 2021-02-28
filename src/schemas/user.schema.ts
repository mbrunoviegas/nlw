import * as yup from 'yup';
import { Assign, TypeOfShape } from 'yup/lib/object';
import { Optionals } from 'yup/lib/types';

export const UserSchema: yup.ObjectSchema<any> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
