describe('tests if page is linked', function(){
    var input = {"name1456389366927":"rob","message1456389366927":"hey%20chika","name1457389366938":"kat","message1457389366921":"hey%20chiko"};
    it('get the first name e.g. rob', function(){
        expect(format(1, 'name', input)).toBe("rob");
    });
    it('get the first name e.g. rob', function(){
        expect(format(2, 'name', input)).toBe("kat");
    });
    it('get the first message e.g. hey%20chika', function(){
        expect(format(1, 'message', input)).toBe("hey%20chika");
    });
    it('get first time as an array in the form date, month, hrs, mins e.g. [21,"feb", 9, 55]', function(t){
        expect(format(1, 'time', input)).toEqual([21,'Feb', 9, 55]);
        t();
    });
    it('get the second time e.g. [30, "Oct", 11, 42]', function(t){
        expect(format(2, 'time', input)).toEqual([ 30, 'Oct', 11, 42 ]);
        t();
    });
});
