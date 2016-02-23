describe("index", function() {
    it("tests if the button has been clicked in index.html and message has been returned", function(done) {
        var userMessage;
        document.getElementById('message').value = "hi";
        document.getElementById('button').addEventListener("click", function() {
            userMessage = document.getElementById('message').value;
        });
        document.getElementById('button').click();
        expect(document.getElementById('message').value).toBe("hi");
        done();
    });
});
