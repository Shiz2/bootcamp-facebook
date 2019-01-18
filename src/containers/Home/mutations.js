import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $variables) {
      token
    }
  } {email: "jb@m.com", password: "12"}) {
`;
  
const SignUp = () => {
  let input;

}