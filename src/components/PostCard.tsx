import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import React from 'react'
import IPost from '../models/IPost';

const PostCard = ({description, id, title, user}: IPost) => {
    //forteller at PostCard skal arve parametere fra IPost

    return (
        <IonCard>
        <img src="assets/tent-picture.jpeg" />
        <IonCardHeader>
          <IonCardSubtitle>
            @ {user.display_name} &bull; ? likes
          </IonCardSubtitle>
          <IonCardTitle>
                {title}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
              {description}
        </IonCardContent>
      </IonCard>
    )
}

export default PostCard;