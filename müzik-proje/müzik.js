class Music{
          constructor(title,singer,img,file){
          this.singer = singer;
          this.title = title;
          this.img = img;
          this.file = file;
        }
        getName(){
            return this.title + " | " + this.singer; 
        }
}

const musicList = [
    new Music("Diller Düşeceğiz","Gülşen","dillere.jpg","dillere.mp3"),
    new Music("Dik Yokuş","Gülşen","dikyokuş.jpg","dikyokuş.mp3"),
    new Music("Canın Sağolsun","Semicenk&Rast","semicenk.jpg","semicenk.mp3"),
    new Music("Boşver", "Nilüfer","1.jpeg","1.mp3"),    
    new Music("Bu da Geçer mi Sevgilim", "Yalın","2.jpeg","2.mp3"),    
    new Music("Aramızda Uçurumlar", "Suat Suna","3.jpeg","3.mp3")    
    
];