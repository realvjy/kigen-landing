import styled from 'styled-components'

const StyledContainer = styled.div<{ maxWidth?: string; padding?: string }>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1100px'};
  margin: 0 auto;
  padding: ${(props) => props.padding || '0 1rem'};
`

export const Container: React.FC<{ maxWidth?: string; padding?: string; children: React.ReactNode }> = ({ maxWidth, padding, children }) => {
    return (
        <StyledContainer maxWidth={maxWidth} padding={padding}>
            {children}
        </StyledContainer>
    )
}

export const Gradient = styled.span<{ $variant?: 'blue' | 'orange' | 'green' }>`
  background: ${({ $variant }) => {
        switch ($variant) {
            case 'blue':
                return 'var(--blue-grad)';
            case 'orange':
                return 'var(--orange-grad)';
            default:
                return `linear-gradient(
          90deg,
          #A142FF 0%,
          #42D0FF 20.67%,
          #42A1FF 44.71%,
          #A1FF42 75%,
          #FF4242 100%
        )`;
        }
    }};
  
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;