import styled from 'styled-components';

export const WalletLogoContainer = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 20px;
  border: 1px solid #e9eae9;
  margin: 0 auto 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  div {
    font-size: 12px;
  }
`;
export const WalletLogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  object-fit: contain;
`;

export const TransactionMessage = styled.p`
  text-align: center;
  font-size: 1rem;
`;
