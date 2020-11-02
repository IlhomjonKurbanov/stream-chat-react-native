import React, { PropsWithChildren, useContext, useState } from 'react';

import { getDisplayName } from '../utils/getDisplayName';

import type { Message } from '../../components/MessageList/utils/insertDates';
import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../types/types';

export type ImageGalleryContextValue<
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
> = {
  images: Message<At, Ch, Co, Ev, Me, Re, Us>[];
  index: number;
  setImages: React.Dispatch<
    React.SetStateAction<Message<At, Ch, Co, Ev, Me, Re, Us>[]>
  >;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ImageGalleryContext = React.createContext<
  ImageGalleryContextValue
>({} as ImageGalleryContextValue);

export const ImageGalleryProvider = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>({
  children,
}: PropsWithChildren<UnknownType>) => {
  const [images, setImages] = useState<Message<At, Ch, Co, Ev, Me, Re, Us>[]>(
    [],
  );
  const [index, setIndex] = useState<number>(0);

  const imageGalleryContext = {
    images,
    index,
    setImages,
    setIndex,
  };

  return (
    <ImageGalleryContext.Provider
      value={(imageGalleryContext as unknown) as ImageGalleryContextValue}
    >
      {children}
    </ImageGalleryContext.Provider>
  );
};

export const useImageGalleryContext = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>() =>
  (useContext(ImageGalleryContext) as unknown) as ImageGalleryContextValue<
    At,
    Ch,
    Co,
    Ev,
    Me,
    Re,
    Us
  >;

export const withImageGalleryContext = <
  P extends UnknownType,
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  Component: React.ComponentType<P>,
): React.FC<
  Omit<P, keyof ImageGalleryContextValue<At, Ch, Co, Ev, Me, Re, Us>>
> => {
  const WithImageGalleryContextComponent = (
    props: Omit<P, keyof ImageGalleryContextValue<At, Ch, Co, Ev, Me, Re, Us>>,
  ) => {
    const imageGalleryContext = useImageGalleryContext<
      At,
      Ch,
      Co,
      Ev,
      Me,
      Re,
      Us
    >();

    return <Component {...(props as P)} {...imageGalleryContext} />;
  };
  WithImageGalleryContextComponent.displayName = `WithImageGalleryContext${getDisplayName(
    Component,
  )}`;
  return WithImageGalleryContextComponent;
};