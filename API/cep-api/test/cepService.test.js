const fetchAddress = require('../src/services/cepService');
const axios = require('axios');

jest.mock('axios');

describe('fetchAddress', () => {
    it('should return address data when a valid CEP is provided', async () => {
        const mockCep = '01001000';
        const mockResponse = {
            data: {
                cep: '01001-000',
                logradouro: 'Praça da Sé',
                complemento: 'lado ímpar',
                bairro: 'Sé',
                localidade: 'São Paulo',
                uf: 'SP',
                ibge: '3550308',
                gia: '1004',
                ddd: '11',
                siafi: '7107'
            }
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await fetchAddress(mockCep);
        expect(result).toEqual(mockResponse.data);
        expect(axios.get).toHaveBeenCalledWith(`https://viacep.com.br/ws/${mockCep}/json/`);
    });

    it('should throw an error when the API call fails', async () => {
        const mockCep = '00000000';
        axios.get.mockRejectedValue(new Error('API Error'));

        await expect(fetchAddress(mockCep)).rejects.toThrow('Error fetching address data');
        expect(axios.get).toHaveBeenCalledWith(`https://viacep.com.br/ws/${mockCep}/json/`);
    });
});