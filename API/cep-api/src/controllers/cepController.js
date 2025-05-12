const fetchAddress = require('../services/cepService');

class CepController {
    async getAddressByCep(req, res) {
        const { cep } = req.params;
        try {
            const address = await fetchAddress(cep);
            if (address) {
                res.status(200).json(address);
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching address', error: error.message });
        }
    }
}

module.exports = CepController;