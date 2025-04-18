import styled from 'styled-components'

const StyledContainer = styled.div<{ maxWidth?: string; padding?: string }>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1200px'};
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