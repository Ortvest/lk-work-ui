import { Subtitle } from '@modules/WelcomeMessage/layout/Subtitle';
import { Text } from '@modules/WelcomeMessage/layout/Text';
import { Title } from '@modules/WelcomeMessage/layout/Title';
import { WelcomeMessageWrapper } from '@modules/WelcomeMessage/layout/WelcomeMessageWrapper';

export const WelcomeMessage = (): JSX.Element => {
  return (
    <WelcomeMessageWrapper>
      <Title />
      <Subtitle />
      <Text />
    </WelcomeMessageWrapper>
  );
};
