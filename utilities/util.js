const baseURL = 'http://localhost:8800/uploads/';

export const getImageUrl = (imageUrl) => {
    console.log(imageUrl)
    if(imageUrl != null && !imageUrl.includes('https://')) {
        console.log(baseURL+imageUrl);
        return baseURL + imageUrl;
    } else {
        console.log(imageUrl);
        return imageUrl
    }
}

export const getProfileImgUrl = (imageUrl,id) => {
    if(imageUrl != null && !imageUrl.includes('https://')) {
        const additionalData = {profileId: id};
        const queryString = new URLSearchParams(additionalData).toString();
        return `${baseURL + imageUrl}?${queryString}`;
    } else {
        console.log(imageUrl);
        return imageUrl
    }
};

