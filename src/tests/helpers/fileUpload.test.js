import { fileUpload } from "../../helpers/fileUpload"
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'dzryusmqp',
    api_key: '444981739854263',
    api_secret: 'Lkgx2VN7HiXBz_kOfw1ArQD-8e0' 
});


describe('Testing file upload', () => {
    test('Verify the file uploaded', async ( ) => {
        const img = await fetch('http://4.bp.blogspot.com/-BOkfV-O8wy0/UyCo0__fumI/AAAAAAAAACc/NREAHxBoWoc/s1600/dibujos-sencillos-1.jpg');
        const blob = await img.blob();
        
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.gif', '');

        await cloudinary.v2.api.delete_resources(imageId, {}, () => {
            //done();
        });



    });

    test('It must return an error', async () => {
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    });
})