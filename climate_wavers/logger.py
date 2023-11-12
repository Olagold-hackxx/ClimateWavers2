import logging

# Configure the logging settings
logging.basicConfig(filename='climatewavers.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(name)s - %(message)s')

# Create a logger instance
logger = logging.getLogger('climatewavers')
