import { useFrame } from "react-three-fiber";

type Props = { update: (now: number) => void };

export default function Frame(props: Props) {
  const { update } = props;
  useFrame(() => update(performance.now()));
  return null;
}
