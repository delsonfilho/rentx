import React from "react";

interface Props {
    active?: boolean;
}

import { Container } from "./styles";
export function Bullet({ active = false }: Props) {
    return <Container active={active} />;
}
