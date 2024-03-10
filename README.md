### Deploy Action

GitHub Action for deploying stacks to [Portainer](https://portainer.io).

### Usage

To use this action, simply create a workflow in `.github/workflows` and use it:

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]

env:
  ENVIRONMENT: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
  IMAGE_PATH: docker/${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    uses: saturdayshdev/deploy-action@v1.0.0
    with:
      portainer-url: ${{ secrets.PORTAINER_URL }}
      portainer-username: ${{ secrets.PORTAINER_USERNAME }}
      portainer-password: ${{ secrets.PORTAINER_PASSWORD }}
      portainer-endpoint-id: ${{ vars.PORTAINER_ENDPOINT }}
      env-file: ${{ vars.ENVFILE }}
      stack-name: ${{ env.ENVIRONMENT }}-${{ github.event.repository.name }}
      stack-compose-path: ${{ env.IMAGE_PATH }}/docker-compose.yml
      stack-pull-image: true
      stack-prune: true
```
