import styled from "styled-components";
import { Text } from '../typography/text.component'

export const Title = styled(Text)`
  font-size: ${(props) => props.theme.sizes[2]};
  font-family: Oswald_400Regular
`;

export const MediumText = styled(Text)`
  font-size: ${(props) => props.theme.sizes[1]};
  font-family: Lato_400Regular;
  color: grey;
`;

export const SmallText = styled(Text)`
  font-size: ${(props) => props.theme.sizes[0]};
  font-family: Lato_400Regular
`;

export const Wrapper = styled.View`

`