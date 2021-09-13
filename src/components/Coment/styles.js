import styles from "styled-components";

export const CardComent = styled.article`
    background-color: var(--bgPrimary);
    margin-bottom: 10px;

    padding: 10px;

    > header{
        display: flex;
        align-items: center;
        gap: 5px;

        > img{
            width: 40px;
        }

        > div > p {
            font-weight: bold;
        }

        > div > span {
            font-size: 14px;
        }
    }

    > p {
        margin-top: 14px;
        border-left: 3px solid var(--primary);
        padding-left: 10px;
    }
`;