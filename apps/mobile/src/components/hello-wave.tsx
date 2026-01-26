import Animated from 'react-native-reanimated';

export function HelloWave() {
  return (
    <Animated.Text
    className="text-red-500"
      style={{
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
test
    </Animated.Text>
  );
}
