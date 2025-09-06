# Colors Helper Tools 모노레포

이곳은 pnpm 워크스페이스로 관리되는 **Colors Helper Tools** 프로젝트의 공식 모노레포입니다.

## 🎨 소개

이 프로젝트는 개발자와 디자이너가 색상을 더 쉽게 다룰 수 있도록 도와주는 도구 모음입니다. 강력한 JavaScript 라이브러리와 편리한 커맨드 라인 인터페이스(CLI)를 포함하고 있습니다.

## 📦 패키지

이 모노레포는 다음 패키지들을 포함합니다:

-   `packages/colors-helper-tools`: 색상 조작, 변환, 생성을 위한 핵심 라이브러리 및 CLI 도구입니다.
-   `packages/docs`: Next.js로 만들어진 프로젝트 공식 문서 웹사이트입니다.

## 🚀 시작하기

이 모노레포에서 개발을 시작하려면 다음 단계를 따르세요:

1.  **리포지토리 클론:**
    ```bash
    git clone https://github.com/citron03/colors-helper-tools.git
    cd colors-helper-tools
    ```

2.  **의존성 설치:**
    이 프로젝트는 [pnpm](https://pnpm.io/)을 패키지 매니저로 사용합니다.
    ```bash
    pnpm install
    ```

3.  **패키지 빌드:**
    `colors-helper-tools` 패키지를 빌드하려면 다음 명령어를 실행하세요:
    ```bash
    pnpm --filter colors-helper-tools build
    ```

4.  **테스트 실행:**
    ```bash
    pnpm test
    ```

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 `colors-helper-tools` 패키지 내의 `LICENSE` 파일을 참고하세요.
