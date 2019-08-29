import styled from 'styled-components';

const Title = styled.h3`
  margin-bottom: 0;
  width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
  left: 0;
  top: 0;
  padding: ${props => (props.fullWidth ? '9px 16px' : '8px 32px')};
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-left: ${props => (props.fullWidth ? null : 0)};
  position: ${props => (props.fullWidth ? 'absolute' : null)};
`;

const SubTitle = styled.h3`
  margin: 0;
  color: #444;
`;


export {
  Title,
  SubTitle,
};
