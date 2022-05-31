import "../styles/styles.css";
import { ThemeProvider } from "../styles/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
