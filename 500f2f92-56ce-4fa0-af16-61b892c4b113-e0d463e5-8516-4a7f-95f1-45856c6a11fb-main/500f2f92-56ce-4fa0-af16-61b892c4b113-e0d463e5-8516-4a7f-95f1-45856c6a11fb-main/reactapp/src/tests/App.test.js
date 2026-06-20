import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';
import AddPlayer from '../components/AddPlayer';
import ViewPlayer from '../components/ViewPlayer';
import Footer from '../components/Footer';


test('renders_App_with_Header_and_routing_links', () => {
  render(
    <App />
  );

  // Assert that the header title is present in the document
  const headerTitleElement = screen.getByText(/Neo Cricket Tournament Registration/i);
  expect(headerTitleElement).toBeInTheDocument();

  // Assert that the routing links are present in the document
  const playersLinkElement = screen.getByText(/Players/i);
  const homeLinkElement = screen.getByText(/Home/i);

  expect(playersLinkElement).toBeInTheDocument();
  expect(homeLinkElement).toBeInTheDocument();
});


test('renders_Home_component_with_Heading', () => {
  render(
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  );

  const headingElement = screen.getByText(/Welcome to Cricket Tournament Registration/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders_Home_component_image_used_inside_div_home', () => {
  render(
  <BrowserRouter>
    <Home/>
  </BrowserRouter>
  );
  const homeDiv = screen.getByText(/Welcome to Cricket Tournament Registration/i);
  const imageElement = screen.getAllByRole('img');
  expect(homeDiv).toBeInTheDocument();
  expect(imageElement.length).toBeGreaterThan(0);
});

test('renders_AddPlayer_component_form_Home', () => {
  render(<App/> );
  
  const registerPlayerLink = screen.getByText(/Register Player/i);
  fireEvent.click(registerPlayerLink);

  // Assert that the redirected text is present in the document
  const redirectedTextElement = screen.getByText(/Register a New Player/i);
  expect(redirectedTextElement).toBeInTheDocument();
});

test('renders_Player_title_correclty', () => {
  render(<App/> );
  
  const viewPlayersLink = screen.getByText(/Players/i);
  fireEvent.click(viewPlayersLink);

  // Assert that the redirected text is present in the document
  const redirectedTextElement = screen.getByText(/All Players/i);
  expect(redirectedTextElement).toBeInTheDocument();
});

test('renders_form_input_fields_and_labels', () => {
    render(
        <BrowserRouter>
          <AddPlayer />
        </BrowserRouter>
      );
    
  // Assert that the form input fields and their respective labels are present in the document
  const playerNameLabel = screen.getByLabelText(/Player Name:/i);
  const playerCityLabel = screen.getByLabelText(/Player City:/i);
  const phoneLabel = screen.getByLabelText(/Phone:/i);
  const playedInLabel = screen.getByLabelText(/Played In:/i);
  const playerTypeLabel = screen.getByLabelText(/Player Type:/i);
  const lastPlayedForLabel = screen.getByLabelText(/Last Played For:/i);

  const playerNameInput = screen.getByRole('textbox', { name: /Player Name:/i });
  const playerCityInput = screen.getByRole('textbox', { name: /Player City:/i });
  const phoneInput = screen.getByRole('textbox', { name: /Phone:/i });
  const playedInSelect = screen.getByRole('combobox', { name: /Played In:/i });
  const playerTypeSelect = screen.getByRole('combobox', { name: /Player Type:/i });
  const lastPlayedForSelect = screen.getByRole('combobox', { name: /Last Played For:/i });


  expect(playerNameLabel).toBeInTheDocument();
  expect(playerCityLabel).toBeInTheDocument();
  expect(phoneLabel).toBeInTheDocument();
  expect(playedInLabel).toBeInTheDocument();
  expect(playerTypeLabel).toBeInTheDocument();
  expect(lastPlayedForLabel).toBeInTheDocument();

  expect(playerNameInput).toBeInTheDocument();
  expect(playerCityInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(playedInSelect).toBeInTheDocument();
  expect(playerTypeSelect).toBeInTheDocument();
  expect(lastPlayedForSelect).toBeInTheDocument();
});

test('displays_validation_errors_with_empty_input', async () => {
    render(
        <BrowserRouter>
          <AddPlayer />
        </BrowserRouter>
      );
    

  // Find the submit button and trigger the click event
  const submitButton = screen.getByText(/Register Player/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    // Assert that validation error messages are displayed for empty input fields
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Player City is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Played In is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Player Type is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Played For is required/i)).toBeInTheDocument();
  });
});

test('checks_submit_form_functionality', async () => {
    render(
        <BrowserRouter>
          <AddPlayer />
        </BrowserRouter>
      );
    

  const playerNameInput = screen.getByLabelText(/Player Name:/i);
  const playerCityInput = screen.getByLabelText(/Player City:/i);
  const phoneInput = screen.getByLabelText(/Phone:/i);
  const playedInSelect = screen.getByLabelText(/Played In:/i);
  const playerTypeSelect = screen.getByLabelText(/Player Type:/i);
  const lastPlayedForSelect = screen.getByLabelText(/Last Played For:/i);

  fireEvent.change(playerNameInput, { target: { value: 'Sample Player' } });
  fireEvent.change(playerCityInput, { target: { value: 'Sample City' } });
  fireEvent.change(phoneInput, { target: { value: '1234567890' } });
  fireEvent.change(playedInSelect, { target: { value: 'International' } });
  fireEvent.change(playerTypeSelect, { target: { value: 'Batsman' } });
  fireEvent.change(lastPlayedForSelect, { target: { value: 'Team A' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  const submitButton = screen.getByText(/Register Player/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/addPlayer'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: 'Sample Player',
          playerCity: 'Sample City',
          phone: '1234567890',
          playedIn: 'International',
          playerType: 'Batsman',
          lastPlayedFor: 'Team A',
        }),
      })
    );
  });

  fetchMock.mockRestore();
});

test('fetches_data_from_the_backend_when_the_component_mounts', async () => {
  const mockPlayerData = [
    {
      playerId: 1,
      playerName: 'Sample Player 1',
      playerCity: 'City 1',
      phone: '1234567890',
      playedIn: 'Domestic',
      playerType: 'Batsman',
      lastPlayedFor: 'Team A',
    },
    {
      playerId: 2,
      playerName: 'Sample Player 2',
      playerCity: 'City 2',
      phone: '9876543210',
      playedIn: 'International',
      playerType: 'Bowler',
      lastPlayedFor: 'Team B',
    },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockPlayerData),
    ok: true,
  });

  render(<ViewPlayer />);

  // Wait for the component to render and fetch data
  await waitFor(() => {
    expect(screen.getByText('Sample Player 1')).toBeInTheDocument();
    expect(screen.getByText('City 1')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Domestic')).toBeInTheDocument();
    expect(screen.getByText('Batsman')).toBeInTheDocument();
    expect(screen.getByText('Team A')).toBeInTheDocument();

    expect(screen.getByText('Sample Player 2')).toBeInTheDocument();
    expect(screen.getByText('City 2')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText('International')).toBeInTheDocument();
    expect(screen.getByText('Bowler')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/getAllPlayer'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  global.fetch.mockRestore();
});


test('renders_Cricket_Tournament_Registration_App_in_the_footer', () => {
  render(<Footer />);
  const footerText = screen.getByText(/Cricket Tournament Registration App/i);
  expect(footerText).toBeInTheDocument();
});