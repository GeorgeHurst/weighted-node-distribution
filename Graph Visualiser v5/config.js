const colours = {
    //https://root.connectuk.host/sites/Comms/SitePages/UK%20Brand/Branding%20Guidelines%20and%20Templates.aspx?web=1
    dark_grey: '#5E6A71',
    light_grey: '#A5ACAF',
    stone: '#7C7C7C',
    white: '#FFFFFF',
    black: '#000000',
    red: '#E4002B',
    orange: '#E27249',
    blue: '#3CA1D5',
    shrek: '#C9D500',
    green: '#45AF6A',
    light_purple: '#A58EC2',
    dark_blue: '#568FA2'
}


const theme = {
  // Colour for the background
  backgroundColour: colours.dark_blue,

  // Colours for varying node states
  baseNodeColour: colours.light_grey,
  highlightedNodeColour: colours.red,
  centeredNodeColour: colours.white,

  // Colour of the edges
  edgeColour: colours.black
  
}

const config = {
  // Search depth for requesting related nodes
  searchDepth: 1
}
