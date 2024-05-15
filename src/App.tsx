import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant='primary' />
      <Button variant='danger' />
      <Button variant='secondary' />
      <Button variant='success' />

      <GlobalStyle />
    </ThemeProvider>
  )
}