describe("report endpoint", () => {
    it("works correctly with an id", async () => {
        jest.mock("axios", function() {
            const axios = function() {
                return Promise.resolve({data: {}})
            };

            axios.post = () => Promise.resolve({data: {access_token: "AT"}});

            return axios;
        });
        const mockRes = {
            json: jest.fn(() => {})
        };
        const reportRoute = require("../../routes/report");
        await reportRoute({params: {id: 1}}, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith({});

    });

    it("works correctly without an id", async () => {
        jest.mock("axios", function() {
            const axios = function() {
                return Promise.resolve({data: {}})
            };

            axios.post = () => Promise.resolve({data: {access_token: "AT"}});

            return axios;
        });
        const mockRes = {
            json: jest.fn(() => {})
        };
        const reportRoute = require("../../routes/report");
        await reportRoute({params: {}}, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith({});
    })
})