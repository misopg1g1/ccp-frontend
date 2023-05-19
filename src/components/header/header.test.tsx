import { Provider } from 'react-redux';
import { describe, it } from "vitest";
import { render, screen } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Header from "../../components/header/header.component";
import { LOGIN_SUCCESS } from "../../constants/actionTypes";
import dayjs from "dayjs";

dayjs.locale("es");
const userData = {
  access_token: "",
  data: {
    user: "John Doe"
  }
}

describe("<Header />", () => {

  it('Should renders with the correct fields', async () => {
    const {store} = configureStore();
    store.dispatch({
      type: LOGIN_SUCCESS, 
      token: userData.access_token, 
      userData: userData.data 
    });
    render(
      <Provider store={store}>
        <Header></Header>
      </Provider>
    );

    const welcomeText = screen.getByText(`Bienvenido ${userData.data.user}`);
    expect(welcomeText).toBeInTheDocument();
    
    const date = dayjs().format("MMMM DD, YYYY");
    const formattedDate = date.charAt(0).toUpperCase() + date.slice(1)
    const dateText = screen.getByText(formattedDate);
    expect(dateText).toBeInTheDocument();
  })

});